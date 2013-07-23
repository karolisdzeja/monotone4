class HeartsController < ApplicationController
  before_action :set_heart, only: [:show, :edit, :update]
  before_filter :authenticate_user!

  # GET /hearts
  # GET /hearts.json
  def index
    @hearts = current_user.hearts
  end

  # GET /hearts/1
  # GET /hearts/1.json
  def show
  end

  # GET /hearts/new
  def new
    @heart = Heart.new
  end

  # GET /hearts/1/edit
  def edit
  end

  # POST /hearts
  # POST /hearts.json
  def create
    @heart = Heart.new
    @heart.user = current_user
    @heart.video = Video.find(params['video_id'])

    respond_to do |format|
      if @heart.save
        format.html { redirect_to @heart, notice: 'Heart was successfully created.' }
        format.json { render action: 'show', status: :created, location: @heart }
      else
        format.html { render action: 'new' }
        format.json { render json: @heart.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /hearts/1
  # PATCH/PUT /hearts/1.json
  def update
    respond_to do |format|
      if @heart.update(heart_params)
        format.html { redirect_to @heart, notice: 'Heart was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @heart.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /hearts/1
  # DELETE /hearts/1.json
  def destroy
    @heart = current_user.hearts.find_by video_id: params[:id]
    @heart.destroy
    respond_to do |format|
      format.html { redirect_to hearts_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_heart
      @heart = Heart.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def heart_params
      params.require(:heart).permit(:user_id, :video_id, :created_at)
    end
end
