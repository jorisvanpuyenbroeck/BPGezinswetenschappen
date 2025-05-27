using AutoMapper;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;
using BPGezinswetenschappen.API.Dtos.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BPGezinswetenschappen.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly BPContext _context;
        private readonly IMapper _mapper;

        public UsersController(BPContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Users
        // [Authorize(Policy = "GetAllUsers")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserReadDto>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<UserReadDto>>(users));
        }

        // GET: api/Users/5
        // [Authorize(Policy = "GetUser")]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserReadDto>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<UserReadDto>(user));
        }

        // PUT: api/Users/5
        // [Authorize(Policy = "UpdateUser")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserUpdateDto userUpdateDto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _mapper.Map(userUpdateDto, user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // [Authorize(Policy = "CreateUser")]
        [HttpPost]
        public async Task<ActionResult<UserReadDto>> PostUser(UserCreateDto userCreateDto)
        {
            var user = _mapper.Map<User>(userCreateDto);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            var result = _mapper.Map<UserReadDto>(user);
            return CreatedAtAction("GetUser", new { id = user.UserId }, result);
        }

        // DELETE: api/Users/5
        // [Authorize(Policy = "DeleteUser")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("sub/{sub}")]
        public bool Auth0UserExists(string sub)
        {
            return _context.Users.Any(e => e.Sub == sub);
        }


        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

    }
}
