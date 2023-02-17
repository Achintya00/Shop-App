using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingApi.Models.EF;

namespace ShoppingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterUsersController : ControllerBase
    {
        private readonly NGshoppingDBContext _context = new NGshoppingDBContext();

        //public RegisterUsersController(NGshoppingDBContext context)
        //{
        //    _context = context;
        //}

        // GET: api/RegisterUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegisterUser>>> GetRegisterUsers()
        {
            return await _context.RegisterUsers.ToListAsync();
        }

        // GET: api/RegisterUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegisterUser>> GetRegisterUser(int id)
        {
            var registerUser = await _context.RegisterUsers.FindAsync(id);

            if (registerUser == null)
            {
                return NotFound();
            }
     
            return registerUser;
        }

        // PUT: api/RegisterUsers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegisterUser(int id, RegisterUser registerUser)
        {
            if (id != registerUser.Rid)
            {
                return BadRequest();
            }

            _context.Entry(registerUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegisterUserExists(id))
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

        // POST: api/RegisterUsers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RegisterUser>> PostRegisterUser(RegisterUser registerUser)
        {
            _context.RegisterUsers.Add(registerUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegisterUser", new { id = registerUser.Rid }, registerUser);
        }

        // DELETE: api/RegisterUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegisterUser(int id)
        {
            var registerUser = await _context.RegisterUsers.FindAsync(id);
            if (registerUser == null)
            {
                return NotFound();
            }

            _context.RegisterUsers.Remove(registerUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegisterUserExists(int id)
        {
            return _context.RegisterUsers.Any(e => e.Rid == id);
        }
    }
}
