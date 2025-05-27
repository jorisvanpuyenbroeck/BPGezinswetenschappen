using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;
using BPGezinswetenschappen.API.Dtos.Slot;
using DAL.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlotsController : ControllerBase
    {
        private readonly BPContext _context;
        private readonly IMapper _mapper;

        public SlotsController(BPContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Slots
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SlotReadDto>>> GetSlots()
        {
            var slots = await _context.Slots.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<SlotReadDto>>(slots));
        }

        // GET: api/Slots/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SlotReadDto>> GetSlot(int id)
        {
            var slot = await _context.Slots.FindAsync(id);
            if (slot == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<SlotReadDto>(slot));
        }

        // PUT: api/Slots/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSlot(int id, SlotUpdateDto updateDto)
        {
            var slot = await _context.Slots.FindAsync(id);
            if (slot == null)
            {
                return NotFound();
            }
            _mapper.Map(updateDto, slot);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Slots.Any(e => e.SlotId == id))
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

        // POST: api/Slots
        [HttpPost]
        public async Task<ActionResult<SlotReadDto>> PostSlot(SlotCreateDto createDto)
        {
            var slot = _mapper.Map<Slot>(createDto);
            _context.Slots.Add(slot);
            await _context.SaveChangesAsync();
            var result = _mapper.Map<SlotReadDto>(slot);
            return CreatedAtAction("GetSlot", new { id = slot.SlotId }, result);
        }

        // DELETE: api/Slots/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSlot(int id)
        {
            var slot = await _context.Slots.FindAsync(id);
            if (slot == null)
            {
                return NotFound();
            }
            _context.Slots.Remove(slot);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool SlotExists(int id)
        {
            return _context.Slots.Any(e => e.SlotId == id);
        }
    }
}
