using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;

namespace BPGezinswetenschappen.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTopicsController : ControllerBase
    {
        private readonly BPContext _context;

        public UserTopicsController(BPContext context)
        {
            _context = context;
        }

        // GET: api/UserTopics
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserTopic>>> GetUserTopics()
        {
            return await _context.UserTopics.ToListAsync();
        }

        // GET: api/UserTopics/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserTopic>> GetUserTopic(int id)
        {
            var userTopic = await _context.UserTopics.FindAsync(id);

            if (userTopic == null)
            {
                return NotFound();
            }

            return userTopic;
        }

        // PUT: api/UserTopics/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserTopic(int id, UserTopic userTopic)
        {
            if (id != userTopic.Id)
            {
                return BadRequest();
            }

            _context.Entry(userTopic).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserTopicExists(id))
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

        // POST: api/UserTopics
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserTopic>> PostUserTopic(UserTopic userTopic)
        {
            _context.UserTopics.Add(userTopic);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserTopic", new { id = userTopic.Id }, userTopic);
        }

        // DELETE: api/UserTopics/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserTopic(int id)
        {
            var userTopic = await _context.UserTopics.FindAsync(id);
            if (userTopic == null)
            {
                return NotFound();
            }

            _context.UserTopics.Remove(userTopic);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserTopicExists(int id)
        {
            return _context.UserTopics.Any(e => e.Id == id);
        }
    }
}
