using AutoMapper;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;
using BPGezinswetenschappen.API.Dtos.Proposal;
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
        private readonly IMapper _mapper;

        public ProposalsController(BPContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Proposals
        // [Authorize(Policy = "GetAllProposals")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProposalReadDto>>> GetProposals()
        {
            var proposals = await _context.Proposals.Include(x => x.Topics).ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ProposalReadDto>>(proposals));
        }

        // GET: api/Proposals/by-topic
        // [Authorize(Policy = "GetAllProposals")]
        [HttpGet("by-topic")]
        public async Task<ActionResult<IEnumerable<ProposalReadDto>>> GetProposalsByTopicIds([FromQuery] List<int> topicIds)
        {
            IQueryable<Proposal> query = _context.Proposals.Include(x => x.Topics);
            if (topicIds != null && topicIds.Any())
            {
                query = query.Where(p => p.Topics.Any(t => topicIds.Contains(t.TopicId)));
            }
            var filteredProposals = await query.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ProposalReadDto>>(filteredProposals));
        }

        // GET: api/Proposals/5
        // [Authorize(Policy = "GetProposal")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProposalReadDto>> GetProposal(int id)
        {
            var proposal = await _context.Proposals.Include(p => p.Projects).Include(p => p.Topics).FirstOrDefaultAsync(p => p.ProposalId == id);
            if (proposal == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<ProposalReadDto>(proposal));
        }

        // PUT: api/Proposals/5
        // [Authorize(Policy = "UpdateProposal")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProposal(int id, ProposalUpdateDto proposalUpdateDto)
        {
            var proposal = await _context.Proposals
                .Include(p => p.Topics)
                .FirstOrDefaultAsync(p => p.ProposalId == id);
            if (proposal == null)
            {
                return NotFound();
            }
            // Map basic fields
            _mapper.Map(proposalUpdateDto, proposal);
            // Update related topics
            proposal.Topics.Clear();
            if (proposalUpdateDto.TopicIds?.Any() == true)
            {
                foreach (var topicId in proposalUpdateDto.TopicIds)
                {
                    var topic = await _context.Topics.FindAsync(topicId);
                    if (topic != null)
                    {
                        proposal.Topics.Add(topic);
                    }
                }
            }
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
        // [Authorize(Policy = "CreateProposal")]
        [HttpPost]
        public async Task<ActionResult<ProposalReadDto>> PostProposal(ProposalCreateDto proposalCreateDto)
        {
            var proposal = _mapper.Map<Proposal>(proposalCreateDto);

            // Attach related topics based on provided IDs
            if (proposalCreateDto.TopicIds?.Any() == true)
            {
                proposal.Topics = new List<Topic>();
                foreach (var topicId in proposalCreateDto.TopicIds)
                {
                    var topic = await _context.Topics.FindAsync(topicId);
                    if (topic != null)
                    {
                        proposal.Topics.Add(topic);
                    }
                }
            }
            _context.Proposals.Add(proposal);
            await _context.SaveChangesAsync();
            var result = _mapper.Map<ProposalReadDto>(proposal);
            return CreatedAtAction("GetProposal", new { id = proposal.ProposalId }, result);
        }

        // DELETE: api/Proposals/5
        // [Authorize(Policy = "DeleteProposal")]
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
