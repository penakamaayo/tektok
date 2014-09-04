# Rails Best ~~Practices~~ Opinions

* ## Fat Model, Skinny Controller
  
  * Use model association

    **Bad Smell**
    ```ruby
    class QuestionsController < ApplicationController
      def create
        @question = Question.new(question_params)
        @question.user_id = current_user.id
        @question.save
      end
    end
    ```

    **Refactor**
    ```ruby
    class QuestionsController < ApplicationController
      def create
        @question = current_user.questions.build(question_params)
        @question.save
      end
    end
    ```

    ```ruby
    class User < ActiveRecord::Base
      has_many :questions
    end
    ```

  * Scope it out

    **Bad Smell**
    ```ruby
    class PostsController < ApplicationController
      def index
        @published_posts = Post.find(:all, :conditions => { :state => 'published' },
                                           :limit => 10,
                                           :order => 'created_at desc')

        @draft_posts = Post.find(:all, :conditions => { :state => 'draft' },
                                       :limit => 10,
                                       :order => 'created_at desc')
      end
    end
    ```

    **Refactor**
    ```ruby
    class PostsController < ApplicationController
      def index
        @published_posts = Post.published
        @draft_posts = Post.draft
      end
    end

    class Post < ActiveRecord::Base
      scope :published, :conditions => { :state => 'published' },
                                         :limit => 10,
                                         :order => 'created_at desc'
      scope :draft, :conditions => { :state => 'draft' },
                                     :limit => 10,
                                     :order => 'created_at desc'
    end
    ```


* "Business Logic" on Model
  
  **Bad Smell**
  ```ruby
  class PostsController < ApplicationController
    def publish
      @post = Post.find(params[:id])
      @post.update_attribute(:is_published, true)
      @post.approved_by = current_user
      if @post.created_at > Time.now - 7.days
        @post.popular = 100
      else
        @post.popular = 0
      end

      redirect_to post_url(@post)
    end
  end
  ```

  **Refactor**
  ```ruby
  class Post < ActiveRecord::Base
    def publish
      self.is_published = true
      self.approved_by = current_user
      if self.created_at > Time.now - 7.days
        self.popular = 100
      else
        self.popular = 0
      end
    end
  end
  ```

  ```ruby
  class PostsController < ApplicationController
    def publish
      @post = Post.find(params[:id])
      @post.publish

      redirect_to post_url(@post)
    end
  end
  ```


  * User model callback
  * Add model virtual attribute


* ## Law of Demeter
   > *an entity should only talk to its close friends*

  **Bad Smell**
  ```ruby
  class Invoice < ActiveRecord::Base
    belongs_to :user
  end

  <%= @invoice.user.name %>
  <%= @invoice.user.address %>
  <%= @invoice.user.cellphone %>
  ```

  **Possible fix**
  ```ruby
  class Invoice < ActiveRecord::Base
    belongs_to :user

    def user_name
      user.name
    end
  end
  ```
  
  **Refactor**
  ```ruby
  class Invoice < ActiveRecord::Base
    belongs_to :user
    delegate :name, :address, :cellphone, :to => :user, :prefix => true
  end

  <%= @invoice.user_name %>
  <%= @invoice.user_address %>
  <%= @invoice.user_cellphone %>
  ```

* ## Overuse route customizations
  
  **Bad Smell**
  ```ruby
  resources :questions, :member => { :answers => :get,
                                   :create_answers => :post,
                                   :update_answer => :put,
                                   :delete_answer => :delete }
  ```

  **Refactor**
  ```ruby
  resources :questions do
    resources :answers
  end
  ```

* ## Always add DB index
  

* ##Extras
  * ## Annotate your models

    ```ruby
    # == Schema Information
    #
    # Table name: map_settings
    #
    #  id         :integer          not null, primary key
    #  map_id     :integer          not null
    #  latitude   :float            default(0.0), not null
    #  longitude  :float            default(0.0), not null
    #  zoom       :integer          default(9), not null
    #  min_zoom   :integer          default(1), not null
    #  max_zoom   :integer          default(18), not null
    #  base_map   :integer          default(1), not null
    #  created_at :datetime
    #  updated_at :datetime
    #

    class MapSetting < ActiveRecord::Base

      belongs_to :map

    end
    ```

  * ##remove trailing whitespace
  * **Keep code struture in models consistent**
