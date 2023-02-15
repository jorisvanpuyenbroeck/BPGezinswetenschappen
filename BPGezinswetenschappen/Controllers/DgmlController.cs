using BPGezinswetenschappen.DAL.Data;
using Microsoft.AspNetCore.Mvc;

namespace BPGezinswetenschappen.API.Controllers
{
    [Route("dgml")]
    public class DgmlController : Controller
    {
        public BPContext _context { get; }


        public DgmlController(BPContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Creates a DGML class diagram of most of the entities in the project wher you go to localhost/dgml
        /// See https://github.com/ErikEJ/SqlCeToolbox/wiki/EF-Core-Power-Tools
        /// </summary>
        /// <returns>a DGML class diagram</returns>
        [HttpGet]
        public IActionResult Get()
        {

            System.IO.File.WriteAllText(Directory.GetCurrentDirectory() + "\\Entities.dgml",
                _context,
                System.Text.Encoding.UTF8);

            var file = System.IO.File.OpenRead(Directory.GetCurrentDirectory() + "\\Entities.dgml");
            var response = File(file, "application/octet-stream", "Entities.dgml");
            return response;
        }
    }
}