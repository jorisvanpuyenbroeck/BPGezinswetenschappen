using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;
using BPGezinswetenschappen.API.Dtos.Presentation;
using AutoMapper;
using DAL.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PresentationsController : ControllerBase
    {
        private readonly BPContext _context;
        private readonly IMapper _mapper;

        public PresentationsController(BPContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Presentations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PresentationReadDto>>> GetPresentations()
        {
            var presentations = await _context.Presentations.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<PresentationReadDto>>(presentations));
        }

        // GET: api/Presentations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PresentationReadDto>> GetPresentation(int id)
        {
            var presentation = await _context.Presentations.FindAsync(id);
            if (presentation == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<PresentationReadDto>(presentation));
        }

        // PUT: api/Presentations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPresentation(int id, PresentationUpdateDto updateDto)
        {
            var presentation = await _context.Presentations.FindAsync(id);
            if (presentation == null)
            {
                return NotFound();
            }
            _mapper.Map(updateDto, presentation);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Presentations.Any(e => e.PresentationId == id))
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

        // POST: api/Presentations
        [HttpPost]
        public async Task<ActionResult<PresentationReadDto>> PostPresentation(PresentationCreateDto createDto)
        {
            var presentation = _mapper.Map<Presentation>(createDto);
            _context.Presentations.Add(presentation);
            await _context.SaveChangesAsync();
            var result = _mapper.Map<PresentationReadDto>(presentation);
            return CreatedAtAction("GetPresentation", new { id = presentation.PresentationId }, result);
        }

        // DELETE: api/Presentations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePresentation(int id)
        {
            var presentation = await _context.Presentations.FindAsync(id);
            if (presentation == null)
            {
                return NotFound();
            }
            _context.Presentations.Remove(presentation);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool PresentationExists(int id)
        {
            return _context.Presentations.Any(e => e.PresentationId == id);
        }
    }
}
