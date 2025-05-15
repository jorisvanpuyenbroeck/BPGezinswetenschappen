using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BPGezinswetenschappen.DAL.Data;
using DAL.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PresentationDaysController : ControllerBase
    {
        private readonly BPContext _context;

        public PresentationDaysController(BPContext context)
        {
            _context = context;
        }

        // GET: api/PresentationDays
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PresentationDay>>> GetPresentationDays()
        {
            return await _context.PresentationDays.ToListAsync();
        }

        // GET: api/PresentationDays/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PresentationDay>> GetPresentationDay(int id)
        {
            var presentationDay = await _context.PresentationDays.FindAsync(id);

            if (presentationDay == null)
            {
                return NotFound();
            }

            return presentationDay;
        }

        // PUT: api/PresentationDays/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPresentationDay(int id, PresentationDay presentationDay)
        {
            if (id != presentationDay.PresentationDayId)
            {
                return BadRequest();
            }

            _context.Entry(presentationDay).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PresentationDayExists(id))
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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PresentationDay>> PostPresentationDay(PresentationDay presentationDay)
        {
            _context.PresentationDays.Add(presentationDay);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPresentationDay", new { id = presentationDay.PresentationDayId }, presentationDay);
        }

        // DELETE: api/PresentationDays/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePresentationDay(int id)
        {
            var presentationDay = await _context.PresentationDays.FindAsync(id);
            if (presentationDay == null)
            {
                return NotFound();
            }

            _context.PresentationDays.Remove(presentationDay);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PresentationDayExists(int id)
        {
            return _context.PresentationDays.Any(e => e.PresentationDayId == id);
        }
    }
}
