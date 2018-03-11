using NLog;
using System;
using System.Web.Http;
using LetsTravelApp.DataAccessLayer.Repositories;
using LetsTravelApp.DataAccessLayer.Interfaces;
using LetsTravelApp.DataAccessLayer.Entities;
using LetsTravelApp.Backend.Models;
using Microsoft.AspNet.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace LetsTravelApp.Backend.Controllers
{
    /// <summary>
    /// Handles any requests related to Trip Entity and TripsDB
    /// </summary>
    public class TripsController : ApiController
    {
        private IRepository<Trip> _tripsRepository;

        public TripsController(IRepository<Trip> repository)
        {
            _tripsRepository = repository;
        }

        /// <summary>
        /// Returns all trips of specific user.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        [HttpGet]
        [Route("api/trips/getusertrips")]
        public async Task<IHttpActionResult> GetUserTrips([FromUri]string userName)
        {
            IEnumerable<Trip> result = null;
            var logger = LogManager.GetCurrentClassLogger();

            try
            {
                result = await Task.Run(() =>
                {
                    return _tripsRepository.Find(t => t.User == userName);
                });
            }
            catch (Exception ex)
            {
                logger.Error(ex.Message);
            }

            if (result != null)
            {
                logger.Info($"TripsController -> handled request : GetUserTrips -> with input : {userName} -> success");
                return Ok(result);
            }

            logger.Error($"TripsController -> handled request  : GetUserTrips -> with input : {userName} -> not found");
            return NotFound();
        }

        /// <summary>
        /// Adds new trip into TripDB
        /// </summary>
        /// <param name="trip">Trip to add.</param>
        [HttpPost]
        [Route("api/trips/add")]
        public async Task<IHttpActionResult> AddTrip([FromBody]TripModel trip)
        {
            var logger = LogManager.GetCurrentClassLogger();

            bool result = await Task.Run(() =>
            {
                try
                {
                    var identityClaims = (ClaimsIdentity)User.Identity;
                    var newTrip = new Trip()
                    {
                        User = identityClaims.FindFirstValue("UserName"),
                        City = trip.City,
                        Country = trip.Country,
                        StartDate = DateTime.Parse(trip.StartDate),
                        EndDate = DateTime.Parse(trip.EndDate),
                        Comment = trip.Comment,
                        Raiting = trip.Raiting
                    };

                    _tripsRepository.Create(newTrip);
                    if (_tripsRepository.Get(newTrip.Id) == null)
                        return false;
                    return true;
                }
                catch (Exception ex)
                {
                    logger.Error(ex.Message);
                }
                return false;
            });

            if (result)
            {
                logger.Info($"TripsController -> handled request : AddTrip -> with input : {trip} -> success");
                return Ok("Added");
            }
            else
            {
                logger.Error($"TripsController -> handled request  : GetUserTrips -> with input : {trip} -> can not add trip to DB");
                return InternalServerError(new Exception("Can not add trip to DB"));
            }
        }

        /// <summary>
        /// Deletes a specific trip.
        /// </summary>
        /// <param name="id">Id of the trip to delete.</param>
        [HttpDelete]
        [Route("api/trips/delete")]
        public async Task<IHttpActionResult> DeleteUserTrip(int id)
        {
            var logger = LogManager.GetCurrentClassLogger();

            if (_tripsRepository.Get(id) == null)
            {
                logger.Error($"TripsController -> handled request  : DeleteTrip -> with input : {id} -> not found");
                return NotFound();
            }
                
            bool result = await Task.Run(() =>
            {
                try
                {
                    _tripsRepository.Delete(id);
                }
                catch(Exception ex)
                {
                    logger.Error(ex.Message);
                }
                

                if (_tripsRepository.Get(id) != null)
                    return false;
                else return true;
            });

            if (result)
            {
                logger.Error($"TripsController -> handled request  : DeleteTrip -> with input : {id} -> success");
                return Ok("Deleted");
            }
            else
            {
                logger.Error($"TripsController -> handled request  : DeleteTrip -> with input : {id} -> can not delete trip from DB");
                return InternalServerError(new Exception("Can not delete trip from DB"));
            }         
        }

        /// <summary>
        /// Updates comment for the specific trip.
        /// </summary>
        /// <param name="id">Id of the trip to update.</param>
        /// <param name="comment">New comment to update.</param>
        [HttpPut]
        [Route("api/trips/updatecomment")]
        public async Task<IHttpActionResult> UpdateComment(int id, string comment)
        {
            var logger = LogManager.GetCurrentClassLogger();

            if (string.IsNullOrEmpty(comment) || string.IsNullOrWhiteSpace(comment))
            {
                logger.Error($"TripsController -> handled request  : UpdateComment -> with input : {id} & {comment} -> string is empty");
                return BadRequest("Empty string");
            }
                
            if (_tripsRepository.Get(id) == null)
            {
                logger.Error($"TripsController -> handled request  : UpdateComment -> with input : {id} & {comment} -> not found");
                return NotFound();
            }
                
            bool result = await Task.Run(() =>
            {
                try
                {
                    var trip = _tripsRepository.Get(id);
                    trip.Comment = comment;
                    _tripsRepository.Update(trip);
                }
                catch(Exception ex)
                {
                    logger.Error(ex.Message);
                }

                if (_tripsRepository.Get(id) != null)
                    return true;
                return false;
            });

            if (result)
            {
                logger.Error($"TripsController -> handled request  : UpdateComment -> with input : {id} & {comment} -> success");
                return Ok("Updated");
            }
            else
            {
                logger.Error($"TripsController -> handled request  : UpdateComment -> with input : {id} & {comment} -> Can not update the trip");
                return InternalServerError(new Exception("Can not update the trip"));
            }               
        }
    }
}
