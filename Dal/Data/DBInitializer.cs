namespace BPGezinswetenschappen.DAL.Data
{
    public class DBInitializer
    {
        public static void Initialize(BPContext context)
        {

            context.Database.EnsureCreated();
            //context.Database.EnsureDeleted();


        }
    }
}
