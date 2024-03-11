package com.gymruben.es.service.mapper;

import org.hashids.Hashids;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.gymruben.es.config.Constants;
import com.gymruben.es.domain.VideosClaseOnline;
import com.gymruben.es.service.dto.VideosClaseOnlineDTO;

@Mapper(componentModel = "spring")
public interface VideosClaseOnlineMapper extends EntityMapper<VideosClaseOnlineDTO, VideosClaseOnline> {
    final Hashids hashids = Constants.HASHIDS;

    @Mapping(target = "id", expression = "java(decodeId(dto.getId()))")
    VideosClaseOnline toEntity(VideosClaseOnlineDTO dto);
   
    default String encodeId(Long id) {
        return hashids.encode(id);
    }

    default Long decodeId(String id) {
        return hashids.decode(id)[0];
    }
}
