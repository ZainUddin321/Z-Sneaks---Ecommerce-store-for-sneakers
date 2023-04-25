namespace webapi.Models.DatabaseSettingsModels
{
    public class ZSneaksDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string ZSneaksCollectionName { get; set; } = null!;
    }
}
