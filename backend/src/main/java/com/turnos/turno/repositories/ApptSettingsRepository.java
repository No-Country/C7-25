package com.turnos.turno.repositories;

import com.turnos.turno.models.appt.ApptSettings;
import com.turnos.turno.models.auth.User;
import com.turnos.turno.models.home.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;

import java.util.List;

public interface ApptSettingsRepository extends JpaRepository<ApptSettings,Long>{

    List<ApptSettings> findByProfessionalIdAndServiceId(Long professionalId, Long serviceId);

    List<ApptSettings> findByServiceId(Long serviceId);
}
