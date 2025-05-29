using AutoMapper;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;
using BPGezinswetenschappen.API.Dtos.Proposal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BPGezinswetenschappen.API.Dtos.Topic;

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
        }        // PUT: api/Proposals/5
        // [Authorize(Policy = "UpdateProposal")]
        [HttpPut("{id}")]
        public async Task<ActionResult<ProposalReadDto>> PutProposal(int id, ProposalUpdateDto proposalUpdateDto)
        {
            Console.WriteLine($"Updating proposal with ID: {id}");
            Console.WriteLine($"Received topic IDs: {string.Join(", ", proposalUpdateDto.TopicIds ?? new List<int>())}");
            
            var proposal = await _context.Proposals
                .Include(p => p.Topics)
                .FirstOrDefaultAsync(p => p.ProposalId == id);
                
            if (proposal == null)
            {
                return NotFound();
            }
            
            // Log existing topics before update
            Console.WriteLine($"Existing topics before update: {string.Join(", ", proposal.Topics?.Select(t => t.TopicId) ?? new List<int>())}");
            
            // Apply basic properties from DTO to entity
            _mapper.Map(proposalUpdateDto, proposal);
            
            // Handle topics relationship
            if (proposalUpdateDto.TopicIds != null)
            {
                // Clear existing topics
                proposal.Topics.Clear();
                
                // Add topics from the IDs
                foreach (var topicId in proposalUpdateDto.TopicIds)
                {
                    var topic = await _context.Topics.FindAsync(topicId);
                    if (topic != null)
                    {
                        proposal.Topics.Add(topic);
                        Console.WriteLine($"Added topic with ID: {topic.TopicId}");
                    }
                    else
                    {
                        Console.WriteLine($"Warning: Topic with ID {topicId} not found");
                    }
                }
            }
              try
            {
                await _context.SaveChangesAsync();
                
                // Return the updated proposal with topics included
                var updatedProposal = await _context.Proposals
                    .Include(p => p.Topics)
                    .FirstOrDefaultAsync(p => p.ProposalId == id);
                    
                var result = _mapper.Map<ProposalReadDto>(updatedProposal);
                
                Console.WriteLine($"Updated topics: {string.Join(", ", updatedProposal.Topics?.Select(t => t.TopicId) ?? new List<int>())}");
                
                return Ok(result);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                Console.WriteLine($"Concurrency exception: {ex.Message}");
                if (!ProposalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception updating proposal: {ex.Message}");
                throw;
            }
        }

        // POST: api/Proposals
        // [Authorize(Policy = "CreateProposal")]
        [HttpPost]
        public async Task<ActionResult<ProposalReadDto>> PostProposal(ProposalCreateDto proposalCreateDto)
        {

            Console.WriteLine($"Received proposal: {proposalCreateDto.Title}, Topics: {string.Join(", ", proposalCreateDto.TopicIds)}");

            // Map non-relational fields
            var proposal = new Proposal
            {
                Title = proposalCreateDto.Title,
                Description = proposalCreateDto.Description,
                Origin = proposalCreateDto.Origin
            };

            // Resolve topic IDs to existing Topic entities
            if (proposalCreateDto.TopicIds?.Any() == true)
            {
                var topics = await _context.Topics
                    .Where(t => proposalCreateDto.TopicIds.Contains(t.TopicId))
                    .ToListAsync();

                proposal.Topics = topics;
                // log to console proposal topics
                Console.WriteLine($"Associated topics: {string.Join(", ", topics.Select(t => t.Name))}");
            }
            // log the proposal to the console
            Console.WriteLine($"Creating proposal: {proposal.Title}, Topics: {string.Join(", ", proposalCreateDto.TopicIds)}");

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
