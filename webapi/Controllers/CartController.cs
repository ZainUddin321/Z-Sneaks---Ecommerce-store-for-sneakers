using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class CartController: Controller
    {
        public readonly CartService _cartService;
        public CartController(CartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("getProductsOfCart/{username}")]
        public async Task<List<SneakersModel>> GetProductsOfCart(string username)
        {
            CartModel cart = new CartModel();
            cart = await _cartService.GetByUserNameAsync(username);

            return cart.Sneakers;
        }

        [HttpPost("addToCart/{username}")]
        public async Task<IActionResult> AddToCart(string username, [FromBody()] SneakersModel sneaker)
        {
            var cart = await _cartService.GetByUserNameAsync(username);
            if(cart == null)
            {
                cart = new CartModel();
                cart.UserName = username;
                cart.Sneakers = new List<SneakersModel>() { sneaker };
                await _cartService.CreateAsync(cart);
            }
            else
            {
                SneakersModel result = cart.Sneakers.Find(x => x.Id == sneaker.Id);
                if (result == null)
                {
                    string cartId = cart.Id;
                    cart.Sneakers.Add(sneaker);
                    await _cartService.UpdateAsync(cartId, cart);
                }
                else
                {
                    return Conflict(new
                    {
                        Message = "Product already exist in the cart!"
                    });
                }
            }
            return Ok(new
            {
                Message = "Product added to the cart!"
            });
        }

        [HttpPost("removeFromCart/{username}")]
        public async Task<IActionResult> RemoveFromCart(string username, [FromBody()] SneakersModel sneaker)
        {
            var cart = await _cartService.GetByUserNameAsync(username);
            if(cart != null) {
                var itemToRemove = cart.Sneakers.Single(r => r.Id == sneaker.Id);
                cart.Sneakers.Remove(itemToRemove);
                await _cartService.UpdateAsync(cart.Id, cart);
                return Ok(new
                {
                    Message = "Product removed from cart!"
                });
            }

            return BadRequest(new
            {
                Message = "Product doesn't exist in the cart!"
            });
        }

        [HttpGet("removeItemsFromUserCart/{username}")]
        public async Task<IActionResult> RemoveItemsFromUserCart(string username)
        {
            var cart = await _cartService.GetByUserNameAsync(username);
            if (cart != null && cart.Sneakers.Count > 0)
            {
                cart.Sneakers = new List<SneakersModel>();
                await _cartService.UpdateAsync(cart.Id, cart);
                return Ok(new
                {
                    Message = "All items removed from user cart!"
                });
            }

            return BadRequest(new
            {
                Message = "Username doesn't contain any item in the cart!"
            });
        }
    }
}
