using System;

namespace LetsTravelApp.Backend.Models
{
    public class TripModel
    {
        public string City { get; set; }
        public string Country { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Comment { get; set; }
        public int Raiting { get; set; }
    }
}