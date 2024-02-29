package com.gymruben.es.service.mapper;

import org.hashids.Hashids;
import org.mapstruct.Mapper;

import com.gymruben.es.config.Constants;
import com.gymruben.es.domain.Deportes;
import com.gymruben.es.service.dto.DeportesDTO;

@Mapper(componentModel = "spring")
public interface DeportesMapper extends EntityMapper<DeportesDTO, Deportes> {
    final Hashids hashids = Constants.HASHIDS;
}
