using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Hosting;
using MongoDB.Driver;
using System.Linq;
using webapi.Models;
using webapi.Services;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SneakersController: ControllerBase
    {
        public readonly SneakersService _sneakersService;
        public SneakersController(SneakersService sneakersService) {
            _sneakersService = sneakersService;
        }

        [Route("getAllSneakers")]
        [HttpGet]
        public async Task<List<SneakersModel>> getAllSneakers() =>
        await _sneakersService.GetAsync();

        [HttpGet]
        [Route("getLimitedSneakers/{limit:int}")]
        public async Task<List<SneakersModel>> getLimitedSneakers(int limit)
        {
            List<SneakersModel> result = await _sneakersService.GetLimitedAsync(limit);

            return result;
        }

        [HttpGet]
        [Route("getSneakerById/{id:int}")]
        public async Task<SneakersModel?> getSneakersById(int id) =>
            await _sneakersService.GetAsync(id);

        [HttpGet]
        [Route("getSneakersByCategory/{category}")]
        public async Task<List<SneakersModel>> GetSneakersByCategory(string category)
        {
            List<SneakersModel> result = await _sneakersService.GetByCategoryAsync(category);

            return result;
        }
    }   
}
