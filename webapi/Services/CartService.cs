using Microsoft.Extensions.Options;
using MongoDB.Driver;
using webapi.Models.DatabaseSettingsModels;
using webapi.Models;
using MongoDB.Bson;
using static MongoDB.Driver.WriteConcern;

namespace webapi.Services
{
    public class CartService
    {
        private readonly IMongoCollection<CartModel> _cartCollection;

        public CartService(
            IOptions<CartDatabaseSettings> bookStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                bookStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                bookStoreDatabaseSettings.Value.DatabaseName);

            _cartCollection = mongoDatabase.GetCollection<CartModel>(
                bookStoreDatabaseSettings.Value.CollectionName);
        }

        public async Task<List<CartModel>> GetAsync() =>
        await _cartCollection.Find(_ => true).ToListAsync();

        public async Task<CartModel?> GetAsync(string id) =>
            await _cartCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<CartModel?> GetByUserNameAsync(string username) =>
            await _cartCollection.Find(x => x.UserName == username).FirstOrDefaultAsync();

        public async Task CreateAsync(CartModel newSneaker) =>
            await _cartCollection.InsertOneAsync(newSneaker);

        public async Task UpdateAsync(string id, CartModel updatedSneaker)
        {
            await _cartCollection.ReplaceOneAsync(x => x.Id.Equals(id), updatedSneaker);
            //var update = Builders<CartModel>.Update.Set(restaurant => restaurant.Sneakers, updatedSneaker.Sneakers);
            //await _cartCollection.UpdateOneAsync<CartModel>(x => x.UserName.Equals(updatedSneaker.UserName), update);
        }
         

        public async Task RemoveAsync(string id) =>
            await _cartCollection.DeleteOneAsync(x => x.Id == id);
    }
}

