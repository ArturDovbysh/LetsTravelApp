using System.Data.Entity;

namespace LetsTravelApp.DataAccessLayer.Entities
{
    public class TripsContext : DbContext
    {
        public DbSet<Trip> Trips { get; set; }

        public TripsContext() : base("TripConnection") { }

        public TripsContext(string connectionString) : base(connectionString) { }

    }

}
