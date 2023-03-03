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
    public class ProjectTopicsController : ControllerBase
    {
        private readonly BPContext _context;

        public ProjectTopicsController(BPContext context)
        {
            _context = context;
        }

        // GET: api/ProjectTopics
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectTopic>>> GetProjectTopics()
        {
            return await _context.ProjectTopics.ToListAsync();
        }

        // GET: api/ProjectTopics/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectTopic>> GetProjectTopic(int id)
        {
            var projectTopic = await _context.ProjectTopics.FindAsync(id);

            if (projectTopic == null)
            {
                return NotFound();
            }

            return projectTopic;
        }

        // PUT: api/ProjectTopics/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectTopic(int id, ProjectTopic projectTopic)
        {
            if (id != projectTopic.Id)
            {
                return BadRequest();
            }

            _context.Entry(projectTopic).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectTopicExists(id))
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

        // POST: api/ProjectTopics
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProjectTopic>> PostProjectTopic(ProjectTopic projectTopic)
        {
            _context.ProjectTopics.Add(projectTopic);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectTopic", new { id = projectTopic.Id }, projectTopic);
        }

        // DELETE: api/ProjectTopics/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectTopic(int id)
        {
            var projectTopic = await _context.ProjectTopics.FindAsync(id);
            if (projectTopic == null)
            {
                return NotFound();
            }

            _context.ProjectTopics.Remove(projectTopic);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectTopicExists(int id)
        {
            return _context.ProjectTopics.Any(e => e.Id == id);
        }
    }
}
