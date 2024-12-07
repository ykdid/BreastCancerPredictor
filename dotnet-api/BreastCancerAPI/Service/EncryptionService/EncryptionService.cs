using System.Security.Cryptography;
using System.Text;

namespace BreastCancerAPI.Service.EncryptionService;

public class EncryptionService:IEncryptionService
{
    private readonly IConfiguration _configuration;

    public EncryptionService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    public string Encrypt(string input)
    {
        try
        {
            using (var aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(_configuration["EncryptionKey"]);
                aes.IV = Encoding.UTF8.GetBytes(_configuration["EncryptionIV"]);

                if (aes.Key.Length != 32 || aes.IV.Length != 16)
                {
                    throw new ArgumentException("Invalid encryption key or IV length.");
                }

                using (var encryptor = aes.CreateEncryptor(aes.Key, aes.IV))
                {
                    var inputBytes = Encoding.UTF8.GetBytes(input);
                    var encryptedBytes = encryptor.TransformFinalBlock(inputBytes, 0, inputBytes.Length);
                    return Convert.ToBase64String(encryptedBytes);
                }
            }
        }
        catch (Exception e)
        {
            throw new Exception("Encryption failed.", e);
        }
    }
    
    public string Decrypt(string input)
    {
        try
        {
            using (var aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(_configuration["EncryptionKey"]);
                aes.IV = Encoding.UTF8.GetBytes(_configuration["EncryptionIV"]);
                
                if (aes.Key.Length != 32 || aes.IV.Length != 16)
                {
                    throw new ArgumentException("Invalid encryption key or IV length.");
                }
                using (var decryptor = aes.CreateDecryptor(aes.Key, aes.IV))
                {
                    var inputBytes = Convert.FromBase64String(input);
                    var decryptedBytes = decryptor.TransformFinalBlock(inputBytes, 0, inputBytes.Length);
                    return Encoding.UTF8.GetString(decryptedBytes);
                }
            }
        }
        catch (Exception e)
        {
            throw new Exception("Decription failed.", e);
        }
        
    }
    
    public string Hash(string input)
    {
        try
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
                var builder = new StringBuilder();
                for (var i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
        catch (Exception e)
        {
            throw new Exception("Hashing failed.", e);
        }
       
    }

    public bool VerifyHash(string input, string hash)
    {
        try
        {
            var inputHash = Hash(input);
            return inputHash.Equals(hash, StringComparison.OrdinalIgnoreCase);
        }
        catch (Exception e)
        {
            throw new Exception("Verifying hash failed.", e);
        }
        
    }
}