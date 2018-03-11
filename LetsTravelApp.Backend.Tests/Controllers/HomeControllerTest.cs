﻿using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using LetsTravelApp.Backend;
using LetsTravelApp.Backend.Controllers;

namespace LetsTravelApp.Backend.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Home Page", result.ViewBag.Title);
        }
    }
}
