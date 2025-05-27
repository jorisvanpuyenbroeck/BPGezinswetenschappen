using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;
using BPGezinswetenschappen.API.Dtos.Year;
using AutoMapper;
using DAL.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YearsController : ControllerBase
    {
        private readonly BPContext _context;
        private readonly IMapper _mapper;

        public YearsController(BPContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Years
        [HttpGet]
        public async Task<ActionResult<IEnumerable<YearReadDto>>> GetYears()
        {
            var years = await _context.Years.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<YearReadDto>>(years));
        }

        // GET: api/Years/5
        [HttpGet("{id}")]
        public async Task<ActionResult<YearReadDto>> GetYear(int id)
        {
            var year = await _context.Years.FindAsync(id);
            if (year == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<YearReadDto>(year));
        }

        // PUT: api/Years/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutYear(int id, YearUpdateDto updateDto)
        {
            var year = await _context.Years.FindAsync(id);
            if (year == null)
            {
                return NotFound();
            }
            _mapper.Map(updateDto, year);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Years.Any(e => e.YearId == id))
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

        // POST: api/Years
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<YearReadDto>> PostYear(YearCreateDto createDto)
        {
            var year = _mapper.Map<Year>(createDto);
            _context.Years.Add(year);
            await _context.SaveChangesAsync();
            var result = _mapper.Map<YearReadDto>(year);
            return CreatedAtAction("GetYear", new { id = year.YearId }, result);
        }

        // DELETE: api/Years/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteYear(int id)
        {
            var year = await _context.Years.FindAsync(id);
            if (year == null)
            {
                return NotFound();
            }
            _context.Years.Remove(year);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool YearExists(int id)
        {
            return _context.Years.Any(e => e.YearId == id);
        }
    }
}
