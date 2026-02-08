package com.payment.service;

import com.payment.dto.PaymentDto;
import com.payment.dto.PaymentMethod;
import com.payment.dto.PaymentRequestDto;
import com.payment.dto.PaymentStatus;
import com.payment.entity.PaymentEntity;
import com.payment.error.PaymentException;
import com.payment.reposistory.PaymentRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.List;
import java.util.Optional;


@ExtendWith(MockitoExtension.class)
public class PaymentServiceImpelTest {

    @Mock
    PaymentRepo repo;

    @InjectMocks
    PaymentService service = new PaymentServiceImpel();


    PaymentRequestDto dto = getPaymentMockDTO();

    private PaymentRequestDto getPaymentMockDTO() {
        return new PaymentRequestDto(
                "USER-1001",
                "COURSE-JAVA-101",
                1499.99,
                PaymentMethod.DOLLAR_CARD,
                "Nepal",
                4111111111111111L,
                "09/26",
                "456",
                "Jyoti"
        );

    }


    @DisplayName("testing success payment-case")
    @Test
    void testProcess_Payment(){
        //mock
        Mockito.when(repo.save(Mockito.any(PaymentEntity.class)))
                .thenAnswer(a->a.getArgument(0));

        //actual method call
        String id = service.processPayment(dto);

        Mockito.verify(repo, Mockito.times(1))
                        .save(Mockito.any(PaymentEntity.class));

        Assertions.assertNotNull(id);

    }



    @DisplayName("testing get Payment Info case")
    @Test
    void testGet_Payment_Info(){
        PaymentEntity entity = new PaymentEntity();
        entity.setPid("Payment-ID");
        entity.setAmount(100.0);
        entity.setPaymentDate(Instant.now());
        entity.setStatus(PaymentStatus.SUCCESS);
        entity.setMethod(PaymentMethod.DOLLAR_CARD);
        entity.setCountyName("USA");
        entity.setCardNumber(4111111111111111L);
        entity.setMonthYear("02/26");
        entity.setCvNumber("123");
        entity.setAccountName("Ram");

        //mock
        Mockito.when(repo.findById("Payment-ID"))
                .thenReturn(Optional.of(entity));

        //actual method call
        PaymentDto paymentDto = service.getPaymentInfo("Payment-ID");

        Mockito.verify(repo, Mockito.times(1))
                        .findById("Payment-ID");

        //assertation
        Assertions.assertNotNull(paymentDto);

        Assertions.assertEquals("Payment-ID", paymentDto.pid());

    }



    @DisplayName("testing get Payment Info fail-case")
    @Test
    void testGet_Payment_Info_Fail(){

        Mockito.when(repo.findById("Payment_ID-1212"))
                .thenReturn(Optional.empty());

        PaymentException exception =  Assertions.assertThrows(PaymentException.class, ()->{
            service.getPaymentInfo("Payment_ID-1212");
        });

        Mockito.verify(repo, Mockito.times(1))
                .findById("Payment_ID-1212");

        Assertions.assertTrue(exception.getMessage()
                .contains("No such payment is found having the Id"));

        }



    @DisplayName("testing get ALL Payment")
    @Test
    void testGetALL_Payment_Details(){

        List<PaymentEntity> paymentEntityList = getPaymentMockListEntity();

        Mockito.when(repo.findAll())
                .thenReturn(paymentEntityList);

        List<PaymentDto> payments = service.getALlPayment();

        Assertions.assertNotNull(payments);

        Assertions.assertEquals(payments.get(0).pid(), paymentEntityList.get(0).getPid());

    }



    private List<PaymentEntity> getPaymentMockListEntity() {

        PaymentEntity p1 = new PaymentEntity(
                "PID-1",
                1000.0,
                Instant.now(),
                PaymentStatus.SUCCESS,
                PaymentMethod.DOLLAR_CARD,
                "USER-1",
                "COURSE-1",
                "China",
                1234567890123456L,
                "02/26",
                "123",
                "Jack"
        );

        PaymentEntity p2 = new PaymentEntity(
                "PID-2",
                2000.0,
                Instant.now(),
                PaymentStatus.PENDING,
                PaymentMethod.VISA_CARD,
                "USER-2",
                "COURSE-2",
                "USA",
                9876543210987654L,
                "03/27",
                "456",
                "Elon"
        );
        return List.of(p1, p2);
    }



}


