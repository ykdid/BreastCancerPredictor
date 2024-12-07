    using System.ComponentModel.DataAnnotations;

    namespace BreastCancerAPI.Entities;

    public class User
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string HashPassword { get; set; }
        public ICollection<PredictionResult>? PredictionResults { get; set; }
    }