using AutoMapper;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;
using BPGezinswetenschappen.API.Dtos.Project;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace BPGezinswetenschappen.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly BPContext _context;
        private readonly IMapper _mapper;

        public ProjectsController(BPContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Projects
        // [Authorize(Policy = "GetAllProjects")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectReadDto>>> GetProjects()
        {
            var projects = await _context.Projects
                .Include(p => p.Student)
                .Include(p => p.Coach)
                .Include(p => p.Organisation)
                .Include(p => p.Proposal)
                .Include(p => p.Topics)
                .ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ProjectReadDto>>(projects));
        }


        // GET: api/Projects/5
        // [Authorize(Policy = "GetProject")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectReadDto>> GetProject(int id)
        {
            var project = await _context.Projects
                .Include(p => p.Student)
                .Include(p => p.Coach)
                .Include(p => p.Organisation)
                .Include(p => p.Proposal)
                .Include(p => p.Topics)
                .SingleOrDefaultAsync(p => p.ProjectId == id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ProjectReadDto>(project));
        }

        // PUT: api/Projects/5
        // [Authorize(Policy = "UpdateProject")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, ProjectUpdateDto projectUpdateDto)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            _mapper.Map(projectUpdateDto, project);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
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

        // POST: api/Projects
        // [Authorize(Policy = "CreateProject")]
        [HttpPost]
        public async Task<ActionResult<ProjectReadDto>> PostProject(ProjectCreateDto projectCreateDto)
        {
            var project = _mapper.Map<Project>(projectCreateDto);
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            var result = _mapper.Map<ProjectReadDto>(project);
            return CreatedAtAction("GetProject", new { id = project.ProjectId }, result);
        }

        // DELETE: api/Projects/5
        // [Authorize(Policy = "DeleteProject")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ProjectExists(int id)
        {
            return _context.Projects.Any(e => e.ProjectId == id);
        }
    }
}
