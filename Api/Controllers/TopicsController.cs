using AutoMapper;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;
using BPGezinswetenschappen.API.Dtos;
using BPGezinswetenschappen.API.Dtos.Topic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BPGezinswetenschappen.API.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TopicsController : ControllerBase
    {
        private readonly BPContext _context;
        private readonly IMapper _mapper;

        public TopicsController(BPContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Topics
        // [Authorize(Policy = "GetAllTopics")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TopicReadDto>>> GetTopics()
        {
            var topics = await _context.Topics
                .Include(t => t.Proposals)
                .ToListAsync();
            return Ok(_mapper.Map<IEnumerable<TopicReadDto>>(topics));
        }

        // GET: api/Topics/5
        // [Authorize(Policy = "GetTopic")]
        [HttpGet("{id}")]
        public async Task<ActionResult<TopicReadDto>> GetTopic(int id)
        {
            var topic = await _context.Topics
                .Include(t => t.Proposals)
                .FirstOrDefaultAsync(t => t.TopicId == id);

            if (topic == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<TopicReadDto>(topic));
        }

        // PUT: api/Topics/5
        // [Authorize(Policy = "UpdateTopic")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTopic(int id, TopicUpdateDto topicUpdateDto)
        {
            var topic = await _context.Topics.FindAsync(id);
            if (topic == null)
            {
                return NotFound();
            }

            _mapper.Map(topicUpdateDto, topic);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TopicExists(id))
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

        // POST: api/Topics
        // [Authorize(Policy = "CreateTopic")]
        [HttpPost]
        public async Task<ActionResult<TopicReadDto>> PostTopic(TopicCreateDto topicCreateDto)
        {
            var topic = _mapper.Map<Topic>(topicCreateDto);
            _context.Topics.Add(topic);
            await _context.SaveChangesAsync();

            var result = _mapper.Map<TopicReadDto>(topic);
            return CreatedAtAction("GetTopic", new { id = topic.TopicId }, result);
        }

        // DELETE: api/Topics/5
        // [Authorize(Policy = "DeleteTopic")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTopic(int id)
        {
            var topic = await _context.Topics.FindAsync(id);
            if (topic == null)
            {
                return NotFound();
            }

            _context.Topics.Remove(topic);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TopicExists(int id)
        {
            return _context.Topics.Any(e => e.TopicId == id);
        }
    }
}
