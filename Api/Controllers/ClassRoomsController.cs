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
using BPGezinswetenschappen.API.Dtos.Classroom;
using DAL.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassroomsController : ControllerBase
    {
        private readonly BPContext _context;
        private readonly IMapper _mapper;

        public ClassroomsController(BPContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Classrooms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassroomReadDto>>> GetClassrooms()
        {
            var classrooms = await _context.Classrooms.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ClassroomReadDto>>(classrooms));
        }

        // GET: api/Classrooms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassroomReadDto>> GetClassroom(int id)
        {
            var classroom = await _context.Classrooms.FindAsync(id);
            if (classroom == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<ClassroomReadDto>(classroom));
        }

        // PUT: api/Classrooms/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClassroom(int id, ClassroomUpdateDto classroomUpdateDto)
        {
            var classroom = await _context.Classrooms.FindAsync(id);
            if (classroom == null)
            {
                return NotFound();
            }
            _mapper.Map(classroomUpdateDto, classroom);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Classrooms.Any(e => e.ClassroomId == id))
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

        // POST: api/Classrooms
        [HttpPost]
        public async Task<ActionResult<ClassroomReadDto>> PostClassroom(ClassroomCreateDto classroomCreateDto)
        {
            var classroom = _mapper.Map<Classroom>(classroomCreateDto);
            _context.Classrooms.Add(classroom);
            await _context.SaveChangesAsync();
            var result = _mapper.Map<ClassroomReadDto>(classroom);
            return CreatedAtAction("GetClassroom", new { id = classroom.ClassroomId }, result);
        }

        // DELETE: api/Classrooms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClassroom(int id)
        {
            var classroom = await _context.Classrooms.FindAsync(id);
            if (classroom == null)
            {
                return NotFound();
            }
            _context.Classrooms.Remove(classroom);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ClassroomExists(int id)
        {
            return _context.Classrooms.Any(e => e.ClassroomId == id);
        }
    }
}
