# Rails Best ~~Practices~~ Opinions

* ## Fat Model, Skinny Controller
  
  * Use model association

    ** Bad Smell **
    ```ruby
    class QuestionsController < ApplicationController
      def create
        @question = Question.new(question_params)
        @question.user_id = current_user.id
        @question.save
      end
    end
    ```

    ** Refactor **
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
  * Business Logic on Model
  * Add model virtual attribute
  * User model callback

* ## Law of Demeter

* ## Overuse route customizations

* ## Always add DB index


* ##Extras
  * ## Annotate your models
  * ##remove trailing whitespace
