using System.ComponentModel.DataAnnotations;

namespace LetsTravelApp.Backend.Models
{
    public class AccountModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string LoggedOn { get; set; }

    }
}