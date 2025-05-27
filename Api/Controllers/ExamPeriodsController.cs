using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.API.Dtos.ExamPeriod;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamPeriodsController : ControllerBase
    {
        private readonly BPContext _context;
        private readonly IMapper _mapper;

        public ExamPeriodsController(BPContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/ExamPeriods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExamPeriodReadDto>>> GetExamPeriods()
        {
            var examPeriods = await _context.ExamPeriods.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ExamPeriodReadDto>>(examPeriods));
        }

        // GET: api/ExamPeriods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExamPeriodReadDto>> GetExamPeriod(int id)
        {
            var examPeriod = await _context.ExamPeriods.FindAsync(id);
            if (examPeriod == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<ExamPeriodReadDto>(examPeriod));
        }

        // PUT: api/ExamPeriods/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExamPeriod(int id, ExamPeriodUpdateDto examPeriodUpdateDto)
        {
            var examPeriod = await _context.ExamPeriods.FindAsync(id);
            if (examPeriod == null)
            {
                return NotFound();
            }
            _mapper.Map(examPeriodUpdateDto, examPeriod);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.ExamPeriods.Any(e => e.ExamPeriodId == id))
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
        [HttpPost]
        public async Task<ActionResult<ExamPeriodReadDto>> PostExamPeriod(ExamPeriodCreateDto examPeriodCreateDto)
        {
            var examPeriod = _mapper.Map<ExamPeriod>(examPeriodCreateDto);
            _context.ExamPeriods.Add(examPeriod);
            await _context.SaveChangesAsync();
            var result = _mapper.Map<ExamPeriodReadDto>(examPeriod);
            return CreatedAtAction("GetExamPeriod", new { id = examPeriod.ExamPeriodId }, result);
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
