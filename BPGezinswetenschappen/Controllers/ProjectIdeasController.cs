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
    public class ProjectIdeasController : ControllerBase
    {
        private readonly BPContext _context;

        public ProjectIdeasController(BPContext context)
        {
            _context = context;
        }

        // GET: api/ProjectIdeas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectIdea>>> GetProjectIdeas()
        {
            return await _context.ProjectIdeas.ToListAsync();
        }

        // GET: api/ProjectIdeas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectIdea>> GetProjectIdea(int id)
        {
            var projectIdea = await _context.ProjectIdeas.FindAsync(id);

            if (projectIdea == null)
            {
                return NotFound();
            }

            return projectIdea;
        }

        // PUT: api/ProjectIdeas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectIdea(int id, ProjectIdea projectIdea)
        {
            if (id != projectIdea.Id)
            {
                return BadRequest();
            }

            _context.Entry(projectIdea).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectIdeaExists(id))
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

        // POST: api/ProjectIdeas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProjectIdea>> PostProjectIdea(ProjectIdea projectIdea)
        {
            _context.ProjectIdeas.Add(projectIdea);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectIdea", new { id = projectIdea.Id }, projectIdea);
        }

        // DELETE: api/ProjectIdeas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectIdea(int id)
        {
            var projectIdea = await _context.ProjectIdeas.FindAsync(id);
            if (projectIdea == null)
            {
                return NotFound();
            }

            _context.ProjectIdeas.Remove(projectIdea);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectIdeaExists(int id)
        {
            return _context.ProjectIdeas.Any(e => e.Id == id);
        }
    }
}
