using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using System.Web.Http;
using Microsoft.AspNet.Identity.EntityFramework;
using LetsTravelApp.Backend.Models;
using System.Security.Claims;
using System.Threading.Tasks;
using LetsTravelApp.DataAccessLayer.Repositories;
using LetsTravelApp.DataAccessLayer.Entities;

namespace LetsTravelApp.Backend.Controllers
{
    public class AccountController : ApiController
    {

        /// <summary>
        /// Registers a new user of application.
        /// </summary>
        /// <param name="model">New user to add.</param>
        [HttpPost]
        [Route("api/User/Register")]
        [AllowAnonymous]
        public async Task<IdentityResult> Register(AccountModel model)
        {
            var logger = LogManager.GetCurrentClassLogger();

            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);

            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName
            };

            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 4
            };

            logger.Info($"New user was added : {user.UserName}");
            return await manager.CreateAsync(user, model.Password);

        }

        /// <summary>
        /// Returns a set of application users.
        /// </summary>
        [HttpGet]
        [Route("api/GetAllUsers")]
        public IEnumerable<AccountModel> GetAllUsers()
        {
            var context = new ApplicationDbContext();
            var appUsers = context.Users.ToArray();

            var result = new List<AccountModel>();
            foreach (var user in appUsers)
            {
                result.Add(new AccountModel
                {
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email
                });

            }
            return result;
        }

        /// <summary>
        /// Returns a set of user claims of the specific user. 
        /// </summary>
        [HttpGet]
        [Route("api/GetUserClaims")]
        public async Task<AccountModel> GetUserClaims()
        {
            var logger = LogManager.GetCurrentClassLogger();

            return await Task.Run(() =>
            {
                var identityClaims = (ClaimsIdentity)User.Identity;

                AccountModel model = new AccountModel()
                {
                    UserName = identityClaims.FindFirstValue("UserName"),
                    Email = identityClaims.FindFirstValue("Email"),
                    FirstName = identityClaims.FindFirstValue("FirstName"),
                    LastName = identityClaims.FindFirstValue("LastName"),
                    LoggedOn = identityClaims.FindFirstValue("LoggedOn"),
                };

                logger.Info($"AccountController -> handled request  : GetUserClaims -> success");

                return model;
            });

        }

        /// <summary>
        /// Returns a set of users except the specific user.
        /// </summary>
        /// <param name="userName">User to not incule into result set.</param>
        [HttpGet]
        [Route("api/GetOtherUsers")]
        public async Task<IEnumerable<string>> GetOtherUsers(string userName)
        {
            var logger = LogManager.GetCurrentClassLogger();

            return await Task.Run(() =>
            {
                var context = new ApplicationDbContext();
                var res = context.Users.ToList<ApplicationUser>();
                var otherUsers = res.Where(u => u.UserName != userName);

                var userNames = new List<string>();
                foreach (var user in otherUsers)
                {
                    userNames.Add(user.UserName);
                }

                logger.Info($"AccountController -> handled request  : GetOtherUsers -> success");

                return userNames;
            });

        }

        /// <summary>
        /// Returns a set of user details of the specific user.
        /// </summary>
        /// <param name="userName">User to get delails for.</param>
        [HttpGet]
        [Route("api/GetUserDetails")]
        public async Task<Tuple<AccountModel, IEnumerable<Trip>>> GetUserDetails(string userName)
        {
            var logger = LogManager.GetCurrentClassLogger();

            return await Task.Run(() =>
            {
                var context = new ApplicationDbContext();
                var result = context.Users.ToList<ApplicationUser>().Find(u => u.UserName == userName);
                var account = new AccountModel()
                {
                    UserName = result.UserName,
                    Email = result.Email,
                    FirstName = result.FirstName,
                    LastName = result.LastName
                };

                var repo = new TripRepository(new TripsContext("TripConnection"));
                var trips = repo.Find(t => t.User == userName);

                logger.Info($"AccountController -> handled request  : GetUserDetails -> success");

                return new Tuple<AccountModel, IEnumerable<Trip>>(account, trips);
            });
        }

        /// <summary>
        /// Deletes a specific user from DB and related to it trips.
        /// </summary>
        /// <param name="userName">User to delete.</param>
        [HttpDelete]
        [Route("api/DeleteUser")]
        public async Task<bool> DeleteUser(string userName)
        {
            var logger = LogManager.GetCurrentClassLogger();

            return await Task.Run(() =>
            {
                var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());

                var manager = new UserManager<ApplicationUser>(userStore);

                var user = manager.FindByName(userName);

                manager.Delete(user);

                var repo = new TripRepository(new TripsContext("TripConnection"));
                var trips = repo.Find(t => t.User == userName);

                foreach (var trip in trips)
                {
                    repo.Delete(trip.Id);
                }

                logger.Info($"AccountController -> handled request  : DeleteUser -> success");
                return true;
            });


        }

    }
}
