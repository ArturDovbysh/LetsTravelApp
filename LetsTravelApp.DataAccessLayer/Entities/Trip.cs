using System;

namespace LetsTravelApp.DataAccessLayer.Entities
{
    public class Trip
    {
        public int Id { get; set; }
        public string User { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public string Comment { get; set; }
        public int Raiting { get; set; }
    }
}
