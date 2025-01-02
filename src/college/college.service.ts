import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollegeDto } from './dto/create-college.dto';
import { PrismaService } from 'src/prisma_service/prisma.service';


@Injectable()
export class CollegeService {

  constructor(private prisma: PrismaService) {}
  
  async getCollegeCourses(collegeId: string) {
    return await this.prisma.collegeWiseCourse.findMany({
      where: {
        college_id: collegeId
      },

      orderBy: {
        course_fee: 'desc'
      }
    })

  }

  async getCollegesByCityAndStates(city?: string, state?: string) {
    const anyOne = {
      ...(city && {city : {name: city}}),
      ...(state && {state: {name: state}})
    }

    return await this.prisma.colleges.findMany({
      where: anyOne,
      include: {
        city: true,
        state: true
      }
    })
  }

  async getCollegeData(collegeId: string) {
    const college = await this.prisma.colleges.findUnique({
      where: {
        id: collegeId
      }
    })

   

    if(!college) {
      throw new NotFoundException('College not found')
    }

    const avgSection = await this.prisma.collegePlacement.groupBy({
      by: ['year'],

      where: {
        college_id: collegeId,
        
      },

      _avg: {
        highest_placement: true,
        median_placement: true,
        placement_rate: true,
        average_placement: true,
      },

      
    });

    const placements = await this.prisma.collegePlacement.findMany({
      where: {
        college_id: collegeId,
        
      },

      orderBy: {
        year: 'desc'
      }
    });

    const placementSection = placements.map((section,index, array) => {
      let placement_trend = 'No Data';
      if(index < array.length -1) {
        const currentPlacementRate = section.placement_rate;
        const nextPlacementRate = array[index + 1].placement_rate;
  
       
        placement_trend = currentPlacementRate > nextPlacementRate ? 'UP' : 'DOWN';
      }
  
      return {
        id: section.id,
        college_id: section.college_id,
        year: section.year,
        highest_placement: section.highest_placement,
        average_placement: section.average_placement,
        median_placement: section.median_placement,
        placement_rate: section.placement_rate,
        placement_trend,
      };
      
    });

    
    

    return {
      avgSection: avgSection.map((section) => ({
        year: section.year,
        highest_placement: section._avg.highest_placement,
        median_placement: section._avg.median_placement,
        placement_rate: section._avg.placement_rate,
        average_placement: section._avg.average_placement,
      })),

      placementSection,
      
    }

    
  }




  
}
