using AutoMapper;
using BPGezinswetenschappen.API.Controllers.Resources;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BPGezinswetenschappen.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MakesController : ControllerBase
    {
        private readonly BPContext _context;
        private readonly IMapper _mapper;

        public MakesController(BPContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Makes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MakeResource>>> GetMakes()
        {
            var makes = await _context.Makes.Include(m => m.Models).ToListAsync();

            return _mapper.Map<List<Make>, List<MakeResource>>(makes);
        }

        // GET: api/Makes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Make>> GetMake(int id)
        {
            var make = await _context.Makes.FindAsync(id);

            if (make == null)
            {
                return NotFound();
            }

            return make;
        }

        // PUT: api/Makes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMake(int id, Make make)
        {
            if (id != make.Id)
            {
                return BadRequest();
            }

            _context.Entry(make).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MakeExists(id))
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

        // POST: api/Makes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Make>> PostMake(Make make)
        {
            _context.Makes.Add(make);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMake", new { id = make.Id }, make);
        }

        // DELETE: api/Makes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMake(int id)
        {
            var make = await _context.Makes.FindAsync(id);
            if (make == null)
            {
                return NotFound();
            }

            _context.Makes.Remove(make);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MakeExists(int id)
        {
            return _context.Makes.Any(e => e.Id == id);
        }
    }
}
