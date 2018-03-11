using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using LetsTravelApp.DataAccessLayer.Entities;
using LetsTravelApp.DataAccessLayer.Interfaces;

namespace LetsTravelApp.DataAccessLayer.Repositories
{
    public class TripRepository : IRepository<Trip>
    {
        private TripsContext _context;
        private int _nextId;

        public TripRepository(TripsContext context)
        {
            _context = context;
            _nextId = _context.Trips.Count();
        }

        public IEnumerable<Trip> GetAll()
        {
            return _context.Trips;
        }

        public Trip Get(int id)
        {
            return _context.Trips.Find(id);
        }

        public IEnumerable<Trip> Find(Func<Trip, bool> predicate)
        {
            return _context.Trips.Where(predicate).ToList();
        }

        public void Create(Trip trip)
        {
            _context.Trips.Add(trip);
            _context.SaveChanges();
        }

        public void Update(Trip trip)
        {
            _context.Entry(trip).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            Trip trip = _context.Trips.Find(id);
            if (trip != null)
                _context.Trips.Remove(trip);
            _context.SaveChanges();
        }
    }
}
