package com.gymruben.es.service.mapper;

import org.hashids.Hashids;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.gymruben.es.config.Constants;
import com.gymruben.es.domain.PlanNutricionEntrenamiento;
import com.gymruben.es.service.dto.PlanNutricionEntrenamientoDTO;

@Mapper(componentModel = "spring")
public interface PlanNutricionEntrenamientoMapper extends EntityMapper<PlanNutricionEntrenamientoDTO, PlanNutricionEntrenamiento> {
    final Hashids hashids = Constants.HASHIDS;
    
    @Mapping(target = "id", expression = "java(decodeId(dto.getId()))")
    PlanNutricionEntrenamiento toEntity(PlanNutricionEntrenamientoDTO dto);
   
    default String encodeId(Long id) {
        return hashids.encode(id);
    }
    default Long decodeId(String id) {
        return hashids.decode(id)[0];
    }
}
