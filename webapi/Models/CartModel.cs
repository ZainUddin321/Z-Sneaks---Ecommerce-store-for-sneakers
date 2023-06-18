using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webapi.Models
{
    public class CartModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("userName")]
        public string UserName { get; set; }

        [BsonElement("sneakers")]
        public List<SneakersModel> Sneakers { get; set; }
    }
}
