using System;
using LetsTravelApp.Backend.Controllers;
using LetsTravelApp.DataAccessLayer.Entities;
using LetsTravelApp.DataAccessLayer.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Web.Http;
using System.Collections.Generic;
using System.Web.Http.Results;
using System.Threading.Tasks;
using LetsTravelApp.Backend.Models;

namespace LetsTravel.Backend.Tests
{
    [TestClass]
    public class TripControllerTests
    {
        [TestMethod]
        public void DeleteTripReturnsOk()
        {
            //Arrange
            var mockRepo = new Mock<IRepository<Trip>>();       

            var controller = new TripsController(mockRepo.Object);

            //Act
            Task<IHttpActionResult> actionResult =  controller.DeleteUserTrip(19);

            //Assert
            Assert.IsNotNull(actionResult);            
        }

        [TestMethod]
        public void DeleteTripReturnsNotFound()
        {
            //Arrange
            var mockRepo = new Mock<IRepository<Trip>>();

            var controller = new TripsController(mockRepo.Object);

            //Act
            Task<IHttpActionResult> actionResult = controller.DeleteUserTrip(19);

            //Assert
            Assert.IsInstanceOfType(actionResult.Result,typeof(NotFoundResult));
        }

        [TestMethod]
        public void AddTripReturnsOk()
        {
            //Arrange
            var mockRepo = new Mock<IRepository<Trip>>();
            mockRepo.Setup(
                x => x.Create(new Trip() {
                    Id = 100,
                    User = "SomeUser",
                    City = "City",
                    Country = "Country",
                    StartDate = DateTime.Parse("03/10/1997"),
                    EndDate = DateTime.Parse("03/10/1997")
                }));


            var controller = new TripsController(mockRepo.Object);

            //Act
            Task<IHttpActionResult> actionResult = controller.AddTrip(new TripModel()
            {
                City = "City",
                Country = "Country",
                StartDate = "03/10/1997",
                EndDate = "04/10/1997"
            });

            //Assert
            Assert.IsInstanceOfType(actionResult.Result, typeof(ExceptionResult));
        }
  
    }
}
