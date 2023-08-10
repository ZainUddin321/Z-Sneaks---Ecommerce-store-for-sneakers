using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using webapi.Models;
using webapi.Services;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticateController : Controller
    {
        public readonly UserService _usersService;

        public AuthenticateController(UserService userService)
        {
            _usersService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User userInfo)
        {
            if(userInfo == null)
                return BadRequest();

            User user = await _usersService.CheckUserExistAsync(userInfo.UserName, userInfo.Password);

            if(user == null)
                return NotFound(new { Message = "Invalid username or password!" });

            string token = CreateJWT(user);

            return Ok(new
            {
                Token = token,
                Message = "Login successful!"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User userInfo)
        {
            if (userInfo == null)
                return BadRequest();

            var user = await _usersService.CheckUserExistAsync(userInfo.UserName);

            if (user != null)
                return Conflict(new
                {
                    Message = "User with this name already exist!"
                });

            await _usersService.CreateAsync(userInfo);

            return Ok(new
            {
                Message = "Account has been created successfully!"
            });
        }

        [HttpGet("checkUserExist/{username}")]
        public async Task<IActionResult> CheckUserExist(string username)
        {
            var user = await _usersService.CheckUserExistAsync(username);

            if (user != null)
                return Conflict(new
                {
                    Message = "User with this name already exist."
                });

            return Ok(new
            {
                Message = "User with this name doesn't exist."
            });
        }

        [HttpGet("createJWT")]
        //create javascript web token
        public string CreateJWT(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("MyAuthenticationKey");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, "User"),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                new Claim("username", user.UserName)
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
