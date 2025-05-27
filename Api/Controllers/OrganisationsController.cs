using AutoMapper;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;
using BPGezinswetenschappen.API.Dtos.Organisation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace BPGezinswetenschappen.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganisationsController : ControllerBase
    {
        private readonly BPContext _context;
        private readonly IMapper _mapper;

        public OrganisationsController(BPContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Organisations
        // [Authorize(Policy = "GetAllOrganisations")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrganisationReadDto>>> GetOrganisations()
        {
            var organisations = await _context.Organisations.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<OrganisationReadDto>>(organisations));
        }

        // GET: api/Organisations/5
        //[Authorize(Policy = "GetOrganisation")]
        [HttpGet("{id}")]
        public async Task<ActionResult<OrganisationReadDto>> GetOrganisation(int id)
        {
            var organisation = await _context.Organisations.FindAsync(id);
            if (organisation == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<OrganisationReadDto>(organisation));
        }

        // PUT: api/Organisations/5
        // [Authorize(Policy = "UpdateOrganisation")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrganisation(int id, OrganisationUpdateDto organisationUpdateDto)
        {
            var organisation = await _context.Organisations.FindAsync(id);
            if (organisation == null)
            {
                return NotFound();
            }
            _mapper.Map(organisationUpdateDto, organisation);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganisationExists(id))
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

        // POST: api/Organisations
        // [Authorize(Policy = "CreateOrganisation")]
        [HttpPost]
        public async Task<ActionResult<OrganisationReadDto>> PostOrganisation(OrganisationCreateDto organisationCreateDto)
        {
            var organisation = _mapper.Map<Organisation>(organisationCreateDto);
            _context.Organisations.Add(organisation);
            await _context.SaveChangesAsync();
            var result = _mapper.Map<OrganisationReadDto>(organisation);
            return CreatedAtAction("GetOrganisation", new { id = organisation.OrganisationId }, result);
        }

        // DELETE: api/Organisations/5
        // [Authorize(Policy = "DeleteOrganisation")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrganisation(int id)
        {
            var organisation = await _context.Organisations.FindAsync(id);
            if (organisation == null)
            {
                return NotFound();
            }
            _context.Organisations.Remove(organisation);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool OrganisationExists(int id)
        {
            return _context.Organisations.Any(e => e.OrganisationId == id);
        }
    }
}
