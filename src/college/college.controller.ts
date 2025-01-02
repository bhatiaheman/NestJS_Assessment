import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CreateCollegeDto } from './dto/create-college.dto';
import { JWTAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/college')
@UseGuards(JWTAuthGuard)
@ApiTags('College')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}


  @Get('/college_data/:college_id')
  @ApiBearerAuth()
  async getCollegePlacementData(@Param('college_id') collegeId: string) {
    return await this.collegeService.getCollegeData(collegeId)

  }

  @Get('/college_courses/:college_id')
  @ApiBearerAuth()
  async getCollegeCourses(@Param('college_id') collegeId: string) {
    return await this.collegeService.getCollegeCourses(collegeId)
  }

  @Get('/colleges') 
  @ApiBearerAuth()
  async getColleges(@Query('city') city?:string, @Query('state') state?:string ) {
    return await this.collegeService.getCollegesByCityAndStates(city, state)
  }


  

  
}
