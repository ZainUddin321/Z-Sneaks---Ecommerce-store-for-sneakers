using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace webapi.Models
{
    public class SneakersModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("box_condition")]
        public string BoxCondition { get; set; }

        [BsonElement("brand_name")]
        public string BrandName { get; set; }

        [BsonElement("category")]
        public string[] Category { get; set; }

        [BsonElement("collection_slugs")]
        public string[] CollectionSlugs { get; set; }

        [BsonElement("color")]
        public string Color { get; set; }

        [BsonElement("designer")]
        public string Designer { get; set; }

        [BsonElement("details")]
        public string Details { get; set; }

        [BsonElement("gender")]
        public string[] Gender { get; set; }

        [BsonElement("grid_picture_url")]
        public string GridPictureUrl { get; set; }

        [BsonElement("has_picture")]
        public bool HasPicture { get; set; }

        [BsonElement("has_stock")]
        public bool HasStock { get; set; }

        [BsonElement("sneakerId")]
        public int SneakerID { get; set; }

        [BsonElement("keywords")]
        public object[] Keywords { get; set; }

        [BsonElement("main_picture_url")]
        public string MainPictureUrl { get; set; }

        [BsonElement("midsole")]
        public string Midsole { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("nickname")]
        public string Nickname { get; set; }

        [BsonElement("original_picture_url")]
        public string OriginalPictureUrl { get; set; }

        [BsonElement("product_template_id")]
        public int ProductTemplateId { get; set; }

        [BsonElement("release_date")]
        public string ReleaseDate { get; set; }

        [BsonElement("release_date_unix")]
        public long? ReleaseDateUnix { get; set; }

        [BsonElement("release_year")]
        public int? ReleaseYear { get; set; }

        [BsonElement("retail_price_cents")]
        public int? RetailPriceCents { get; set; }

        [BsonElement("shoe_condition")]
        public string? ShoeCondition { get; set; }

        [BsonElement("silhouette")]
        public string? Silhouette { get; set; }

        [BsonElement("size_range")]
        public float[]? SizeRange { get; set; }

        [BsonElement("sku")]
        public string? StockKeepingUnits { get; set; }
        
        [BsonElement("slug")]
        public string? Slug { get; set; }

        [BsonElement("status")]
        public string? Status { get; set; }

        [BsonElement("story_html")]
        public string? StoryHtml { get; set; }

        [BsonElement("upper_material")]
        public string? UpperMaterial { get; set; }
    }
}
