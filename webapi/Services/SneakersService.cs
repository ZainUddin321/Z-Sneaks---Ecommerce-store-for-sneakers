using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using webapi.Models;
using webapi.Models.DatabaseSettingsModels;

namespace webapi.Services
{
    public class SneakersService
    {
        private readonly IMongoCollection<SneakersModel> _sneakersCollection;

        public SneakersService(
            IOptions<ZSneaksDatabaseSettings> bookStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                bookStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                bookStoreDatabaseSettings.Value.DatabaseName);

            _sneakersCollection = mongoDatabase.GetCollection<SneakersModel>(
                bookStoreDatabaseSettings.Value.ZSneaksCollectionName);
        }

        public async Task<List<SneakersModel>> GetAsync() =>
        await _sneakersCollection.Find(_ => true).ToListAsync();

        public async Task<SneakersModel?> GetAsync(int id) =>
            await _sneakersCollection.Find(x => x.SneakerID == id).FirstOrDefaultAsync();

        public async Task<List<SneakersModel>> GetLimitedAsync(int limit)
        {
            var result = await _sneakersCollection.AsQueryable().Sample(limit).ToListAsync();
            return result;
        }

        public async Task<List<SneakersModel>> GetByCategoryAsync(string category)
        {
            var result = await _sneakersCollection.AsQueryable().Where(x=> x.Category[0] == category).ToListAsync();
            return result;
        }

        public async Task CreateAsync(SneakersModel newSneaker) =>
            await _sneakersCollection.InsertOneAsync(newSneaker);

        public async Task UpdateAsync(string id, SneakersModel updatedSneaker) =>
            await _sneakersCollection.ReplaceOneAsync(x => x.Id == id, updatedSneaker);

        public async Task RemoveAsync(string id) =>
            await _sneakersCollection.DeleteOneAsync(x => x.Id == id);
    }
}
