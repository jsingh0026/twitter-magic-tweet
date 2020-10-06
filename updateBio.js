// Dependencies
const request = require("request");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");

// Initialize
module.exports = (bio) => {
  const oauth = OAuth({
    consumer: {
      key: "6LAmuy7SvCfxgL5zNOmEb6iSI",
      secret: "UzPWh6SBPeV6pT22ZqLmOBhzupuml3gxEtq3bVT3sqY6Cq8qCv",
    },
    signature_method: "HMAC-SHA1",
    hash_function(base_string, key) {
      return crypto
        .createHmac("sha1", key)
        .update(base_string)
        .digest("base64");
    },
  });

  const request_data = {
    url: "https://api.twitter.com/1.1/account/update_profile.json",
    method: "POST",
    data: { description: `${bio}` },
  };

  // Note: The token is optional for some requests
  const token = {
    key: "743505894705496064-1qsIvVxPWJ0UPOzJBiTsVev83GcquyP",
    secret: "uNOF8AqPyUFNVC4w4rGEoFB896R354ywyFlgEi3c9H0w0",
  };

  request(
    {
      url: request_data.url,
      method: request_data.method,
      form: oauth.authorize(request_data, token),
    },
    function (error, response, body) {
      // Process your data here
      console.log(response);
    }
  );
};
