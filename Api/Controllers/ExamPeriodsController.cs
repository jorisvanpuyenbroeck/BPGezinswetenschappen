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
    public class ExamPeriodsController : ControllerBase
    {
        private readonly BPContext _context;

        public ExamPeriodsController(BPContext context)
        {
            _context = context;
        }

        // GET: api/ExamPeriods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExamPeriod>>> GetExamPeriods()
        {
            return await _context.ExamPeriods.ToListAsync();
        }

        // GET: api/ExamPeriods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExamPeriod>> GetExamPeriod(int id)
        {
            var examPeriod = await _context.ExamPeriods.FindAsync(id);

            if (examPeriod == null)
            {
                return NotFound();
            }

            return examPeriod;
        }

        // PUT: api/ExamPeriods/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExamPeriod(int id, ExamPeriod examPeriod)
        {
            if (id != examPeriod.ExamPeriodId)
            {
                return BadRequest();
            }

            _context.Entry(examPeriod).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExamPeriodExists(id))
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

        // POST: api/ExamPeriods
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ExamPeriod>> PostExamPeriod(ExamPeriod examPeriod)
        {
            _context.ExamPeriods.Add(examPeriod);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExamPeriod", new { id = examPeriod.ExamPeriodId }, examPeriod);
        }

        // DELETE: api/ExamPeriods/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExamPeriod(int id)
        {
            var examPeriod = await _context.ExamPeriods.FindAsync(id);
            if (examPeriod == null)
            {
                return NotFound();
            }

            _context.ExamPeriods.Remove(examPeriod);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExamPeriodExists(int id)
        {
            return _context.ExamPeriods.Any(e => e.ExamPeriodId == id);
        }
    }
}
