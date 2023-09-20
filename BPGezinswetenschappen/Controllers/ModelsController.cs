using AutoMapper;
using BPGezinswetenschappen.API.Controllers.Resources;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BPGezinswetenschappen.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelsController : ControllerBase
    {
        private readonly BPContext _context;
        private readonly IMapper _mapper;

        public ModelsController(BPContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Models
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ModelResource>>> GetModels()
        {
            var models = await _context.Models.ToListAsync();
            return _mapper.Map<List<Model>, List<ModelResource>>(models);
        }

        // GET: api/Models/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Model>> GetModel(int id)
        {
            var model = await _context.Models.FindAsync(id);

            if (model == null)
            {
                return NotFound();
            }

            return model;
        }

        // PUT: api/Models/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutModel(int id, Model model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }

            _context.Entry(model).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ModelExists(id))
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

        // POST: api/Models
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Model>> PostModel(Model model)
        {
            _context.Models.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetModel", new { id = model.Id }, model);
        }

        // DELETE: api/Models/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModel(int id)
        {
            var model = await _context.Models.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            _context.Models.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ModelExists(int id)
        {
            return _context.Models.Any(e => e.Id == id);
        }
    }
}
