using System.Security.Claims;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BPGezinswetenschappen.API.Controllers
{
    // only for users

    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProposalsController : ControllerBase
    {
        private readonly BPContext _context;

        public ProposalsController(BPContext context)
        {
            _context = context;
        }

        // GET: api/Proposals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Proposal>>> GetProposals()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);


            if (userIdClaim != null)
            {
                var userId = userIdClaim.Value;

                Console.WriteLine(userId);

            }
            else
            {
                Console.WriteLine("No user id found.");
            }
            
            return await _context.Proposals
                .Include(x => x.Topics)
                .Include(x => x.Projects)
                .ToListAsync();
        }

        // GET: api/Proposals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Proposal>> GetProposal(int id)
        {
            var proposal = await _context.Proposals
                .Include(p => p.Projects)
                .Include(p => p.Topics)
                .FirstOrDefaultAsync(p => p.ProposalId == id);

            if (proposal == null)
            {
                return NotFound();
            }

            return proposal;
        }

        // PUT: api/Proposals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProposal(int id, Proposal proposal)
        {
            if (id != proposal.ProposalId)
            {
                return BadRequest();
            }

            _context.Entry(proposal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProposalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Proposals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Proposal>> PostProposal(Proposal proposal)
        {
            // Fetch the Topic objects based on the incoming Topic IDs
            if (proposal.Topics != null)
            {
                var topicIds = proposal.Topics.Select(t => t.TopicId).ToList();
                proposal.Topics = new List<Topic>();

                foreach (var id in topicIds)
                {
                    var topic = await _context.Topics.FindAsync(id);
                    if (topic != null)
                    {
                        proposal.Topics.Add(topic);
                    }
                }
            }

            _context.Proposals.Add(proposal);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProposal", new { id = proposal.ProposalId }, proposal);
        }




        // DELETE: api/Proposals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProposal(int id)
        {
            var proposal = await _context.Proposals.FindAsync(id);
            if (proposal == null)
            {
                return NotFound();
            }

            _context.Proposals.Remove(proposal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProposalExists(int id)
        {
            return _context.Proposals.Any(e => e.ProposalId == id);
        }
    }
}
