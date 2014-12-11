# OmniAuth
  > Future proof  your authentication..

### Authentication
  > Confirmation of identity and privileges

### Authentication == identity?
  > No => I can have multiple ways of authentications,
  but I only have one identity(during the day at least.. :D)


### Omniauth is a simple ruby gem that let your users authenticate through a growing list of webservices


#### Providers:
  * Facebook
  * Twitter
  * __Google__
  * LinkedIn
  * Github
  * .... (you could also create your own strategy)

---------

### Google oauth strategy
> Strategy to authenticate with Google via OAuth2 in OmniAuth.






### Google API Setup
  * Go to 'https://console.developers.google.com'
  * Create/Select your project.
  * Click 'APIs & auth'
  * Make sure "Contacts API" and "Google+ API" are on.
  * Go to Consent Screen, and provide an 'EMAIL ADDRESS' and a 'PRODUCT NAME'
  * Go to Credentials, create and note the Client ID and the Client Secret.



### Rails Setup

Add to your `Gemfile`:

```ruby
gem 'omniauth-google-oauth2', '~> 0.2.6'
```


First define your application id and secret in "config/initializers/devise.rb"



```ruby
config.omniauth :google_oauth2, "APP_ID", "APP_SECRET", { }
```

Then add the following to 'config/routes.rb' so the callback routes are defined.

```ruby
devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
```

Make sure your model is omniauthable. Generally this is "/app/models/user.rb"

```ruby
devise :omniauthable, :omniauth_providers => [:google_oauth2]
```

Then make sure your callbacks controller is setup.

```ruby
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
      # You need to implement the method below in your model (e.g. app/models/user.rb)
      @user = User.find_for_google_oauth2(request.env["omniauth.auth"], current_user)

      if @user.persisted?
        flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Google"
        sign_in_and_redirect @user, :event => :authentication
      else
        session["devise.google_data"] = request.env["omniauth.auth"]
        redirect_to new_user_registration_url
      end
  end
end
```

and bind to or create the user

```ruby
def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
    data = access_token.info
    user = User.where(:email => data["email"]).first

    # Uncomment the section below if you want users to be created if they don't exist
    # unless user
    #     user = User.create(name: data["name"],
    #        email: data["email"],
    #        password: Devise.friendly_token[0,20]
    #     )
    # end
    user
end
```

For your views you can login using:

```ruby
= link_to "Sign in with Google", user_omniauth_authorize_path :google_oauth2
```



### Limitation

For multiple subdomains: Google doesn't support __wildcard__ redirect URIs --, (eg.  (http://*.example.com)

### Quick fix
  * Created our own callback controller
    * receives the request, params from google
    * created our own controller to validate request
  * Pass the access token to another controller to search the user
  * If user exist, Authenticate user, else.. meh :3

  * Merged. :)


### Resources
  * https://github.com/zquestz/omniauth-google-oauth2
  * https://developers.google.com/accounts/docs/OAuth2
  * https://developers.google.com/oauthplayground/
  * http://intridea.github.io/omniauth/
  * https://github.com/intridea/omniauth/wiki/Strategy-Contribution-Guide
  * http://www.slideshare.net/kbal11/omniauth
  http://stackoverflow.com/questions/21321298/ruby-on-rails-devise-oauth-facebook-omniauthstrategiesoauth2callbackerror/21321946#21321946
  * https://www.hurl.it/







