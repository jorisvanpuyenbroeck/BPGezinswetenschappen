using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;
using BPGezinswetenschappen.API.Dtos.PresentationDay;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PresentationDaysController : ControllerBase
    {
        private readonly BPContext _context;
        private readonly IMapper _mapper;

        public PresentationDaysController(BPContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/PresentationDays
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PresentationDayReadDto>>> GetPresentationDays()
        {
            var days = await _context.PresentationDays.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<PresentationDayReadDto>>(days));
        }

        // GET: api/PresentationDays/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PresentationDayReadDto>> GetPresentationDay(int id)
        {
            var day = await _context.PresentationDays.FindAsync(id);
            if (day == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<PresentationDayReadDto>(day));
        }

        // PUT: api/PresentationDays/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPresentationDay(int id, PresentationDayUpdateDto updateDto)
        {
            var day = await _context.PresentationDays.FindAsync(id);
            if (day == null)
            {
                return NotFound();
            }
            _mapper.Map(updateDto, day);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.PresentationDays.Any(e => e.PresentationDayId == id))
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

        // POST: api/PresentationDays
        [HttpPost]
        public async Task<ActionResult<PresentationDayReadDto>> PostPresentationDay(PresentationDayCreateDto createDto)
        {
            var day = _mapper.Map<PresentationDay>(createDto);
            _context.PresentationDays.Add(day);
            await _context.SaveChangesAsync();
            var result = _mapper.Map<PresentationDayReadDto>(day);
            return CreatedAtAction("GetPresentationDay", new { id = day.PresentationDayId }, result);
        }

        // DELETE: api/PresentationDays/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePresentationDay(int id)
        {
            var day = await _context.PresentationDays.FindAsync(id);
            if (day == null)
            {
                return NotFound();
            }
            _context.PresentationDays.Remove(day);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool PresentationDayExists(int id)
        {
            return _context.PresentationDays.Any(e => e.PresentationDayId == id);
        }
    }
}
