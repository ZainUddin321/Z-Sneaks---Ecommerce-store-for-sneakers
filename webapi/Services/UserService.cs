using Microsoft.Extensions.Options;
using MongoDB.Driver;
using webapi.Models.DatabaseSettingsModels;
using webapi.Models;

namespace webapi.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UserService(
            IOptions<UsersDatabaseSettings> bookStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                bookStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                bookStoreDatabaseSettings.Value.DatabaseName);

            _usersCollection = mongoDatabase.GetCollection<User>(
                bookStoreDatabaseSettings.Value.CollectionName);
        }

        public async Task<List<User>> GetAsync() =>
        await _usersCollection.Find(_ => true).ToListAsync();

        public async Task<User?> CheckUserExistAsync(string username) =>
            await _usersCollection.Find(x => x.UserName == username).FirstOrDefaultAsync();

        public async Task<User?> CheckUserExistAsync(string username, string password) =>
            await _usersCollection.Find(x => x.UserName == username && x.Password == password).FirstOrDefaultAsync();

        public async Task CreateAsync(User user) =>
            await _usersCollection.InsertOneAsync(user);

        public async Task UpdateAsync(string username, User updatedUserInfo) =>
            await _usersCollection.ReplaceOneAsync(x => x.UserName == username, updatedUserInfo);

        public async Task RemoveAsync(string username) =>
            await _usersCollection.DeleteOneAsync(x => x.UserName == username);
    }
}
